import React, { Dispatch, SetStateAction } from "react";
import CustomModal from "../../../component/Modal.component";
import Formulario from "../../../model/interfaces/formulario.model-interface";
import { ObtenerPdf } from "../../../network/rest/index.network";
import RestError from "../../../model/class/resterror.model.class";
import Response from "../../../model/class/response.model.class";

type Props = {
    isOpen: boolean,
    data: Formulario,
    iframeRef: React.RefObject<HTMLIFrameElement>,
    zoomLevel: number,
    setZoomLevel: Dispatch<SetStateAction<number>>,
    handleClose: ()=> void,
    handleZoomIn: ()=>void,
    handleZoomOut: ()=> void,
    handlePrint: ()=> void,
}

const MostrarPdf = (props: Props) =>{
    return (
        <CustomModal
                isOpen={props.isOpen}
                onOpen={async () => {
                    console.log("asdasd")
                    const data: Formulario = {
                        nombreSistema: props.data.nombreSistema,
                        versionSistema: props.data.versionSistema,
                        usuarioNombre: props.data.usuarioNombre,
                        celularAxeso: props.data.celularAxeso,
                        sede: props.data.sede,
                        cargo: props.data.cargo,
                        personaReporte: props.data.personaReporte,
                        celularPersona: props.data.celularPersona,
                        fecha: props.data.fecha,
                        descripcion: props.data.descripcion,
                        descartes: props.data.descartes,
                        imagenes: props.data.imagenes
                        // base64Str: props.data.base64Str,
                        // extension: props.data.extension.toLowerCase()
                        ,
                        descarteAcepta: props.data.descarteAcepta
                    };
             
                    const response = await ObtenerPdf<Blob>(data);

                    if (response instanceof Response) {
                        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
                        const pdfUrl = URL.createObjectURL(pdfBlob);
                        if (props.iframeRef.current) {
                            props.iframeRef.current.src = pdfUrl;
                        }
                    }

                    if (response instanceof RestError) {
                        console.log(response.getMessage())
                        console.log(response.getMessage());
                    }
                }}
                onHidden={() => { }}
                onClose={() => { }}
            >
                <button
                    className="absolute top-2 right-2 p-2 z-[100] rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                    onClick={props.handleClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="w-full p-10">
                        <div className="relative">
                            <div className="relative z-10">
                                <div className="flex justify-center mb-4">
                                    <button
                                        className="block mr-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={props.handleZoomIn}
                                    >
                                        Acercar <i className="bi bi-zoom-in"></i>
                                    </button>
                                    <button
                                        className="block mr-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={props.handleZoomOut}
                                    >
                                        Alejar <i className="bi bi-zoom-out"></i>
                                    </button>
                                    <button
                                        className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={props.handlePrint}
                                    >
                                        Imprimir <i className="bi bi-printer"></i>
                                    </button>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <p className="mr-2">Zoom: {props.zoomLevel.toFixed(0)}%</p>
                                    <input
                                        type="range"
                                        min={10}
                                        max={200}
                                        value={props.zoomLevel}
                                        onChange={(e) => props.setZoomLevel(Number(e.target.value))}
                                        className="w-48"
                                    />
                                </div>
                                <div className="w-full overflow-auto border-2 border-indigo-500">
                                    <iframe
                                        ref={props.iframeRef}
                                        title="PDF Viewer"
                                        width="100%"
                                        height="600"
                                        style={{ transform: `scale(${props.zoomLevel / 100})` }}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </CustomModal>
    );
}

export default MostrarPdf;