import mongoose from 'mongoose';

// connect DB
mongoose.connect('mongodb://127.0.0.1/pcat-test-db');

const Schema = mongoose.Schema;

// create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// create a Photo
// Photo.create({
//     title: 'Photo Title 2',
//     description: 'Photo Description 2 lorem ipsum',
// });

// update a Photo
const updateDocument = async (id) => {
    try {
        const updatedResult = await Photo.findByIdAndUpdate(
            { _id: id },
            { title: 'kaga amca' },
            { new: true },
        );
        console.log(updatedResult);
    } catch (error) {
        console.log(error);
    }
};

// delete a Photo
const deleteDocument = async (id) => {
    try {
        await Photo.findByIdAndDelete(
            { _id: id},
        )
        console.log('Data Deleted Succesfully!');
    } catch (error) {
        console.log(error);
    }

}

deleteDocument('649856252fb931e381088c3d');

// read a Photo
Photo.find({}).then((data) => {
    console.log(data);
});

