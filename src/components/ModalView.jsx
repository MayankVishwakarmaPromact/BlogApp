/* eslint-disable react/prop-types */

export default function ModalView({ children, isModalOpen, setIsModalOpen }) {

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal" open={isModalOpen}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </>
  );
}
