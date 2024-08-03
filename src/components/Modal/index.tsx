import React from 'react'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'

// import Button from './Button'

interface ModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  message: string
}

export default function Modal({
  open,
  setOpen,
  message,
}: Readonly<ModalProps>) {
  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                    <CrossIcon />
                  </div> */}
                  <div className="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {message}
                    </DialogTitle>
                    <div className="mt-2">
                      {/*{isSubmitSuccess ? (*/}
                      {/*  <div className="flex flex-col gap-5 text-sm text-gray-500">*/}
                      {/*    <span>문의 제출이 완료되었습니다. 감사합니다.</span>*/}
                      {/*    <button*/}
                      {/*      type="button"*/}
                      {/*      className="inline-flex w-full justify-center rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                      {/*      onClick={() => setOpen(false)}*/}
                      {/*    >*/}
                      {/*      확인*/}
                      {/*    </button>*/}
                      {/*  </div>*/}
                      {/*) : (*/}
                      {/*  <p className="text-sm text-gray-500">제출중입니다...</p>*/}
                      {/*)}*/}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6"></div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
