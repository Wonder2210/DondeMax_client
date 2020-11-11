import * as React from "react";
import { Image } from "@chakra-ui/core";
import { useDropzone } from "react-dropzone";
import ImageIcon from "@iconify/icons-cil/image-plus";
import Upload from "@iconify/icons-cil/cloud-upload";
import { Icon } from "@iconify/react";

type props = {
  onChange: (e: any) => void;
  image?: string;
};

const DropImage = ({ onChange, image }) => {
  const [state, setState] = React.useState({
    image: null,
  });

  const onDrop = React.useCallback((acceptedFiles) => {
    setState({ image: URL.createObjectURL(acceptedFiles[0]) });
    onChange(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ onDrop, accept: ".jpeg,.png" });

  return (
    <>
      <style jsx>
        {`
          .container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 10em;
            padding: ${state.image ? 0 : `10px`};
            width: 100%;
            height: auto;
            border-width: 2px;
            border-radius: 2px;
            border-color: ${isDragActive ? `#E91E63` : `none`};
            border-style: dashed;
            background-color: #fafafa;
            color: #bdbdbd;
            outline: none;
            transition: border 0.24s ease-in-out;
          }
        `}
      </style>
      <div {...getRootProps()} className="container">
        <input {...getInputProps()} />
        {isDragActive ? (
          <Icon icon={Upload} height="min(100%,4em)" />
        ) : !state.image || !image ? (
          <>
            <Icon icon={ImageIcon} height="min(100%,4em)" />

            <p> Arrastra una imagen aqui </p>
          </>
        ) : (
          <Image width="100%" height="auto" src={state.image} />
        )}
      </div>
    </>
  );
};

export default DropImage;
