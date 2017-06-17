import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from'react-dropzone';
import './UploadBook.css';


class UploadBook extends React.Component {
    constructor(props) {
        super();
        this.clearState();

        this.handleNameChange = this.handleNameChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.onDropFile = this.onDropFile.bind(this);
        this.clearState = this.clearState.bind(this)
    }

    clearState() {
        this.state = {name: '', images: [], filesPreview:[]};
    }

    submitForm() {
        var data = new FormData();
        data.append('name', this.state.name);
        this.state.images.forEach((image) => data.append('images', image));
        fetch('http://localhost:8000/upload_book/', {
            method: 'POST',
            body: data
        });
    }

    handleNameChange(event){
        this.setState({name: event.target.value});
    }

    onDropFile(acceptedFiles, rejectedFiles) {
        var images = this.state.images;
        acceptedFiles.forEach((file) => images.push(file));
        var imagesPreview = [];
        images.forEach((image) =>{
          imagesPreview.push(<div>{image.name}</div>
          )
        });

        this.setState({images: images, imagesPreview: imagesPreview})
    }

    render() {
        return (
            <div>
                <TextField hintText='Title' name="name" value={this.state.name} onChange={this.handleNameChange} />
                <center style={{margin: '30px'}}>
                    <Dropzone name='image' onDrop={this.onDropFile}>Drop some files here or click to select files to upload</Dropzone>
                </center>
                <div>Files to upload:</div>
                {this.state.imagesPreview}
                <RaisedButton className="submit-upload-image" secondary={true} onClick={this.submitForm}>Submit</RaisedButton>
            </div>
        );
    }
}

export default UploadBook;
