import { MinusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { setPhoto, setStep } from "actions/register.action";
import React, { useRef, useState } from "react";
import ImageUploading from "react-images-uploading";
import { connect } from "react-redux";

const Avatar = ({ setStep, setPhoto, photo }) => {
  const [avatar, setAvatar] = useState(photo || null);
  const [DisplayButton, setDisplayButton] = useState(false);

  const onChange = (imageList, addUpdateIndex) => {
    setAvatar(imageList);
  };

  const inputFile = useRef(null);
  const handleSubmit = () => {
    setStep("summary");
    setPhoto(avatar);
  };

  return (
    <div>
      <h1 className="text-3xl font-gibson font-bold mb-4 cursor-pointer">
        Ta photo ...
      </h1>
      <div className="flex justify-center">
        <ImageUploading
          multiple
          value={avatar}
          onChange={onChange}
          maxNumber={1}
          dataURLKey="data_url"
          maxFileSize={4000000}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
            errors,
          }) => (
            <div className="flex-1 flex-col justify-center">
              <div className="rounded flex p-10 justify-center self-center">
                {!imageList?.length ? (
                  <button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <PlusCircleOutlined className="text-gray-700 text-4xl" />
                    <p className="font-gibson text-dark-500 mt-2 text-1xl">
                      Click ici ou drag and drop
                    </p>
                  </button>
                ) : null}
                &nbsp;
                {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                {imageList.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image["data_url"]}
                      className=" w-48 rounded hover:opacity-80 transition-all duration-300 cursor-pointer"
                      alt=""
                      onClick={() => onImageUpdate(index)}
                      onMouseEnter={() => setDisplayButton(true)}
                      onMouseLeave={() => setDisplayButton(false)}
                      width="100"
                    />
                    <div className="image-item__btn-wrapper">
                      <button
                        className="absolute -top-5 -right-2 text-2xl text-red-400"
                        onClick={() => onImageRemove(index)}
                      >
                        <MinusCircleFilled />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {errors && (
                <div className="text-center">
                  {errors?.maxFileSize && (
                    <span className="text-red-400 font-gibson text-center font-semibold">
                      La photo est trop lourde merci de la réduire. (Max 3mb)
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleSubmit()}
          disabled={!avatar?.length}
          className={`${
            !avatar?.length ? "bg-primary-300" : "bg-primary-500"
          } text-gray-100 text-base mt-10 font-gibson py-4 px-10 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outlineshadow-lg`}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photo: state.register.photo,
});

export default connect(mapStateToProps, { setStep, setPhoto })(Avatar);
