import React from 'react';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';


class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictures) {
        this.props.onChange && this.props.onChange(pictures);
    }

       

    render() {
     
        return (
            
                <div>
                    <Image cloudName="xtech" publicId="Desktop" width="300" crop="scale" />
                    <CloudinaryContext cloudName="xtech">
                        <Image publicId="flux.png/" id='preview-id'>
                            <Transformation width="200" crop="scale" angle="10" />
                        </Image>
                    </CloudinaryContext>
                </div>
              

              
        );
    }

}


export default Upload;