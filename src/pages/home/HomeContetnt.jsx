import ResumePDF from "../../assets/Abhishek_Chavan_Resume.pdf"; 

const HomeContent = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <iframe
        src={ResumePDF}
        title="PDF Viewer"
        className="w-full h-screen"
      />
    </div>
  );
};

export default HomeContent;
