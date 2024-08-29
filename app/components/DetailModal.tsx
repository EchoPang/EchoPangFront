interface DetailModalProps {
  selectedDetail: string | null;
  closeModal: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({
  selectedDetail,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">상세 내역</h2>
        <p className="text-sm">{selectedDetail}</p>
        <button
          className="mt-4 px-4 py-2 bg-eco-main text-white rounded"
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
