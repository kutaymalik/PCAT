import { Photo } from '../models/Photo.js'
import path from 'path';
import * as fs from 'fs';

const __dirname = path.resolve();

const getAllPhotos = async (req, res) => {

    const page = req.query.page || 1;
    const photosPerPage = 1;

    const totalPhotos = await Photo.find().countDocuments();

    const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page-1) * photosPerPage)
    .limit(photosPerPage);

    res.render('index', {
        photos,
        current: page,
        pages: Math.ceil(totalPhotos / photosPerPage),
    })
};

const getPhoto = async (req, res) => {
    
    // Üzerine tıklanan fotoğraf id ile birlikte seçiliyor
    const photo = await Photo.findById(req.params.id);

    // Tek başına ayrı bir photo sayfasında gösteriliyor
    res.render('photo', {
        photo,
    });
};

const createPhoto = async (req, res) => {

    // Yükleme yapılacak dosya yolu tanımlanıyor
    const uploadDir = 'public/uploads';

    // Dosya yolu yoksa dosya yolu oluşturuluyor
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    // Yüklenen fotoğraf dosyasının bilgileri çekiliyor
    let uploadImage = req.files.image;

    // Yüklenen fotoğrafın ismi ile birlikte tam yolu tanımlanıyor
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

    // Yüklenen fotoğraf ilgili dosyaya taşınıyor
    uploadImage.mv(uploadPath, async () => {

        // Kullanıcının girdiği bilgilerin isteği ile önce title gibi bilgiler DB'de tanımlanıyor sonrasında image alanına dosya adı ve fotoğrafın ismi bilgileri veriliyor
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name,
        });

        // Ana sayfaya yönlendiriliyor...
        res.redirect('/');
    });
};

const updatePhoto = async (req, res) => {

    // Fotoğrafı photo'ya yapılan istek sonucunda dönen id ile belirlemek
    const photo = await Photo.findOne({ _id: req.params.id });

    // Kullanıcının belirlediği title'ı isteğin body'den çekip photo nesnesine atamak
    photo.title = req.body.title;

    // Kullanıcının belirlediği description'u isteğin body'den çekip photo nesnesine atamak
    photo.description = req.body.description;

    // Photo nesnesini DB'ye kaydediyoruz
    photo.save();

    // Update sayfasından güncellenen fotoğrafın sayfasına yönlendirme yapıyoruz
    res.redirect(`/photos/${req.params.id}`);
};

const deletePhoto = async (req, res) => {

    // Fotoğrafı id'si ile saptamak
    const photo = await Photo.findOne({ _id: req.params.id });

    // Silinecek fotoğrafın dosya yolunu tanımlamak
    let deletedImage = __dirname + '/public' + photo.image;

    // Dosyadan fotoğrafı silmek
    fs.unlinkSync(deletedImage);

    // DB'den fotoğrafın bilgilerini kaldırmak
    await Photo.findByIdAndRemove(req.params.id);

    // Ana sayfaya yönlendirme...
    res.redirect('/');
}

// Fonksiyonları kullanmak için export etmek
export { getAllPhotos, getPhoto, createPhoto, updatePhoto, deletePhoto };
