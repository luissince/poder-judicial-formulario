import { RouteComponentProps } from "react-router-dom";
import { images } from "../../helper/index.helper";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Formulario from "../../model/interfaces/formulario.model-interface";
import { ObtenerPdf } from "../../network/rest/index.network";
import Response from "../../model/class/response.model.class";
import RestError from "../../model/class/resterror.model.class";
import { useEffectOnce } from "react-use";
import CustomModal from "../../component/Modal.component";
import { imageBase64 } from "../../helper/herramienta.helper";
import Base64 from "../../model/interfaces/base64";
import toast from "react-hot-toast";
import PDFData from "../../model/interfaces/pdfdata.model.interface";
import { v4 as uuidv4 } from 'uuid';
import SeleccionarImagen from "./widget/seleccionar.imagen";

const FormularioView = (props: RouteComponentProps<{}>) => {
    const [nombreSistema, setNombreSistema] = useState("");
    const [versionSistema, setVersionSistema] = useState("");
    const [usuarioNombre, setUsuarioNombre] = useState("");
    const [celularAxeso, setCelularAnexo] = useState("");
    const [sede, setSede] = useState("");
    const [cargo, setCargo] = useState("");
    const [personaReporte, setPersonaReporte] = useState("");
    const [celularPersona, setCelularPersona] = useState("");
    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [descartes, setDescartes] = useState("");
    const [base64Str, setBase64Str] = useState("");
    const [extension, setExtension] = useState("");

    const [detalleTabla, setDetalleTabla] = useState([])

    const refNombreSistema = useRef<HTMLSelectElement>(null);
    const refVersionSistema = useRef<HTMLInputElement>(null);
    const refUsuarioNombre = useRef<HTMLInputElement>(null);
    const refCelularAxeso = useRef<HTMLInputElement>(null);
    const refSede = useRef<HTMLInputElement>(null);
    const refCargo = useRef<HTMLInputElement>(null);
    const refPersonaReporte = useRef<HTMLInputElement>(null);
    const refCelularPersona = useRef<HTMLInputElement>(null);
    const refFecha = useRef<HTMLInputElement>(null);
    const refDescripcion = useRef<HTMLTextAreaElement>(null);
    const refDescartes = useRef<HTMLSelectElement>(null);

    // const refImagen = useRef<HTMLInputElement>(null);
    // const [selectedFile, setSelectedFile] = useState<File>();

    const [elementos, setElementos] = useState<JSX.Element[]>([]);

    const [isOpen, setIsOpen] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [zoomLevel, setZoomLevel] = useState(100);

    useEffect(() => {
        return () => {

        };
    }, []);

    const imagenSeleccionada = (file:File) =>{
        console.log(file);
    };

    const agregarElemento = (nombre: string) => {
        const nuevoElemento = (
          <SeleccionarImagen
            imagenSelecionada={imagenSeleccionada}
            // key={nombre}
            // nombre={nombre}
            // imagen={imagen}
          />
        );
      
        setElementos((prevElementos) => [...prevElementos, nuevoElemento]);
      };

    // const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files.length !== 0) {
    //         setSelectedFile(e.target.files[0]);
    //     } else {
    //         setSelectedFile(null);
    //         refImagen.current.value = "";
    //     }
    // };

    // const handleRemoveImage = () => {
    //     refImagen.current.value = "";
    //     setSelectedFile(null);
    // };

    // const handleUploadButtonClick = () => {
    //     refImagen.current.click();
    // };

    const handleButtonClick = async () => {
        if (refNombreSistema.current && refNombreSistema.current.value.trim() === "") {
            refNombreSistema.current.focus();
        } else if (refVersionSistema.current && refVersionSistema.current.value.trim() === "") {
            refVersionSistema.current.focus();
        } else if (refUsuarioNombre.current && refUsuarioNombre.current.value.trim() === "") {
            refUsuarioNombre.current.focus();
        } else if (refCelularAxeso.current && refCelularAxeso.current.value.trim() === "") {
            refCelularAxeso.current.focus();
        } else if (refSede.current && refSede.current.value.trim() === "") {
            refSede.current.focus();
        } else if (refCargo.current && refCargo.current.value.trim() === "") {
            refCargo.current.focus();
        } else if (refPersonaReporte.current && refPersonaReporte.current.value.trim() === "") {
            refPersonaReporte.current.focus();
        } else if (refCelularPersona.current && refCelularPersona.current.value.trim() === "") {
            refCelularPersona.current.focus();
        } else if (refFecha.current && refFecha.current.value.trim() === "") {
            refFecha.current.focus();
        } else if (refDescripcion.current && refDescripcion.current.value.trim() === "") {
            refDescripcion.current.focus();
        } else if (refDescartes.current && refDescartes.current.value.trim() === "") {
            refDescartes.current.focus();
        } 
        // else if (selectedFile == null) {
        //     toast((t) => (
        //         <div className="flex gap-x-4">

        //             <div className="flex items-center">
        //                 <div className="ml-3 flex-1">

        //                     <p className="mt-1 text-sm text-gray-500">
        //                         Seleccione una imagen
        //                     </p>
        //                 </div>
        //             </div>

        //             <div className="flex border-l border-gray-200">
        //                 <button
        //                     onClick={() => toast.dismiss(t.id)}
        //                     className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-upla-100 hover:text-upla-200 focus:outline-none focus:ring-2 focus:ring-upla-100">
        //                     Cerrar
        //                 </button>
        //             </div>
        //         </div>
        //     ), {
        //         position: "top-right"
        //     })
        // }
        else {
            // const result = await imageBase64(refImagen.current.files) as Base64;
            // setBase64Str(result.base64String);
            // setExtension(result.extension);
            handleOpen();
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleZoomIn = () => {
        if (zoomLevel < 200) {
            setZoomLevel(zoomLevel + 10);
        }
    };

    const handleZoomOut = () => {
        if (zoomLevel > 10) {
            setZoomLevel(zoomLevel - 10);
        }
    };

    const handlePrint = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.print();
        }
    };

    const addDetalle = () => {

        let newDetalle = {

            "id": uuidv4(),
            "descripcion": "",
            "foto": "",
        }

        setDetalleTabla([
            ...detalleTabla, newDetalle
        ])

        // setTimeout(()=> {
        //     console.log(detalleTabla)
        // }, 5000)

    }


    const quitarDetalle = (id: Number) => {
        let newDetalle = detalleTabla.filter((det) => det.id != id)
        setDetalleTabla(newDetalle)
    }

    return (
        <div className="isolate bg-white px-6 py-0 sm:py-1 lg:px-8">
            <CustomModal
                isOpen={isOpen}
                onOpen={async () => {
                    console.log("asdasd")
                    const data: Formulario = {
                        nombreSistema: nombreSistema,
                        versionSistema: versionSistema,
                        usuarioNombre: usuarioNombre,
                        celularAxeso: celularAxeso,
                        sede: sede,
                        cargo: cargo,
                        personaReporte: personaReporte,
                        celularPersona: celularPersona,
                        fecha: fecha,
                        descripcion: descripcion,
                        descartes: descartes,
                        base64Str: base64Str,
                        extension: extension.toLowerCase()
                    };
                    const response = await ObtenerPdf<Blob>(data);

                    if (response instanceof Response) {
                        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
                        const pdfUrl = URL.createObjectURL(pdfBlob);
                        if (iframeRef.current) {
                            iframeRef.current.src = pdfUrl;
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
                    onClick={handleClose}
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
                                        onClick={handleZoomIn}
                                    >
                                        Acercar <i className="bi bi-zoom-in"></i>
                                    </button>
                                    <button
                                        className="block mr-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={handleZoomOut}
                                    >
                                        Alejar <i className="bi bi-zoom-out"></i>
                                    </button>
                                    <button
                                        className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={handlePrint}
                                    >
                                        Imprimir <i className="bi bi-printer"></i>
                                    </button>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <p className="mr-2">Zoom: {zoomLevel.toFixed(0)}%</p>
                                    <input
                                        type="range"
                                        min={10}
                                        max={200}
                                        value={zoomLevel}
                                        onChange={(e) => setZoomLevel(Number(e.target.value))}
                                        className="w-48"
                                    />
                                </div>
                                <div className="w-full overflow-auto border-2 border-indigo-500">
                                    <iframe
                                        ref={iframeRef}
                                        title="PDF Viewer"
                                        width="100%"
                                        height="600"
                                        frameBorder="0"
                                        style={{ transform: `scale(${zoomLevel / 100})` }}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </CustomModal>

            <div className="mx-auto mt-2 max-w-3xl sm:mt-6">
                <div className="grid grid-cols-8 w-full border-solid border-2 border-red-700">
                    <div className="col-start-1 col-end-1 p-2">
                        <img src={images.logo_poder_judicial} alt="logo" />
                    </div>
                    <div className="col-start-2 col-end-7 border-solid border-2 border-x-red-700 text-center">
                        <h1 className="font-bold text-2xl mt-1">PODER JUDICIAL</h1>
                        <h5>FORMULARIO DE INCIDENCIA</h5>
                    </div>
                    <div className="col-start-7 col-end-9 text-center">
                        <h5 className="font-bold text-xs mt-1">Formulario N°: </h5>
                        <p className="font-normal text-xs">P-01-2023-GI-GG-PJ-F-01</p>
                        <h5 className="font-bold text-xs mt-1">
                            Versión: <span className="font-normal text-xs">05</span>{" "}
                        </h5>
                        <h5 className="font-bold text-xs mt-1">
                            Fecha: <span className="font-normal text-xs">07/06/2023</span>{" "}
                        </h5>
                    </div>
                </div>
            </div>

            {/* <div className="mx-auto max-w-2xl text-center bg-blue-900">
                <h4 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">FORMULARIO DE INCIDENCIA</h4>

            </div> */}
            <div className="mx-auto mt-4 max-w-3xl sm:mt-8">
                <p className="mt-2 text-base leading-8 text-gray-600">
                    {" "}
                    INFORMACIÓN DEL SISTEMA:{" "}
                </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombre
                            {/* <i className="bi bi-asterisk text-red-600 text-xs"></i> */}
                        </label>
                        <div className="mt-0">
                            <select
                                ref={refNombreSistema}
                                value={nombreSistema}
                                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                    setNombreSistema(event.currentTarget.value);
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="SIJ">SIJ</option>
                                <option value="WEB">WEB</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Versión
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refVersionSistema}
                                value={versionSistema}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setVersionSistema(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600">
                    {" "}
                    INFORMACIÓN DEL USUARIO:{" "}
                </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombre y Apellidos
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refUsuarioNombre}
                                value={usuarioNombre}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setUsuarioNombre(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Celular / Anexo
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refCelularAxeso}
                                value={celularAxeso}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCelularAnexo(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Sede
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refSede}
                                value={sede}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setSede(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Cargo
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refCargo}
                                value={cargo}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCargo(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600">
                    {" "}
                    REPORTADO POR:{" "}
                </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombres y Apellidos
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refPersonaReporte}
                                value={personaReporte}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setPersonaReporte(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Celular
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refCelularPersona}
                                value={celularPersona}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCelularPersona(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600"> INCIDENCIA: </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Fecha
                        </label>
                        <div className="mt-0">
                            <input
                                type="date"
                                ref={refFecha}
                                value={fecha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setFecha(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Descripción
                        </label>
                        <div className="mt-0">
                            <textarea
                                rows={2}
                                ref={refDescripcion}
                                value={descripcion}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                    setDescripcion(event.target.value);
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600"> DESCARTES: </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <div className="mt-0">
                            <select
                                value={descartes}
                                ref={refDescartes}
                                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                    setDescartes(event.target.value);
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="1. ¿El mismo incidente se reproduce en otro equipo?">
                                    1. ¿El mismo incidente se reproduce en otro equipo?{" "}
                                </option>
                                <option value="2. ¿El mismo incidente se reproduce con otros usuarios?">
                                    2. ¿El mismo incidente se reproduce con otros usuarios?{" "}
                                </option>
                                <option value="3. ¿El incidente ocurre solo con un expediente?">
                                    3. ¿El incidente ocurre solo con un expediente?{" "}
                                </option>
                                <option value="4. ¿Lo reportado ha sido validado por implantación?">
                                    4. ¿Lo reportado ha sido validado por implantación?{" "}
                                </option>
                                <option value="5. ¿Se está utilizando la última versión de la aplicación desplegada en la corte?">
                                    5. ¿Se está utilizando la última versión de la aplicación
                                    desplegada en la corte?{" "}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <br />

                {/* <div className="bg-white overflow-hidden sm:rounded-lg float-left">
                    <div className="px-4 py-5 sm:px-6">
                        <p className="mt-2 text-base leading-8 text-gray-600">
                            FLUJO REALIZADO:{" "}
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">

                        <button className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >Agregar Recurso</button>
                    </div>
                </div> */}

                <div className="">
                    <p className="mt-2 text-base leading-8 text-gray-600">
                        FLUJO REALIZADO:{" "}
                    </p>
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => agregarElemento("")}
                    >Agregra Recurso</button>
                </div>

                <br />

                <table className="tn abx acc">
                    <thead>
                        <tr>
                            <th scope="col" className="arv ati atx avf avv awb axq cfy">N °</th>
                            <th scope="col" className="ara arv avf avv awb axq">imagen</th>
                            <th scope="col" className="ara arv avf avv awb axq">Descripción</th>
                            <th scope="col" className="ara arv avf avv awb axq">Quitar</th>
                        </tr>
                    </thead>
                    <tbody className="abx acb">
                        {
                            detalleTabla.length === 0 ? (
                                <tr className="mx-auto">
                                    <td colSpan={4}> Agregar datos a la tabla </td>
                                </tr>
                            )
                                :
                                (
                                    detalleTabla.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                />
                                            </td>
                                            <td>
                                                <input type="text" placeholder="Descripción de la imagen" />
                                            </td>
                                            <td>
                                                <button
                                                    title="Quitar"
                                                    onClick={() => quitarDetalle(item.id)}
                                                ><i className="bi bi-trash"></i></button>
                                            </td>

                                        </tr>
                                    ))
                                )
                        }
                        {/* <tr>
                            <td className="adh arx ati atx avv avz axq cfy">Lindsay Walton</td>
                            <td className="adh ara arx avv axm">Front-end Developer</td>
                            <td className="adh ara arx avv axm">lindsay.walton@example.com</td>
                            <td className="adh ara arx avv axm">Member</td>
                            <td className="ab adh arx ath atz avh avv avz cgf">
                                <a href="#" className="ayc bld">Edit<span className="t">, Lindsay Walton</span></a>
                            </td>
                        </tr> */}
                    </tbody>
                </table>

                {/* {elementos.map(Element, index)=> <Element key={index} />} */}
                {/* <SeleccionarImagen /> */}

                <div className="mt-10">
                    <button
                        onClick={() => handleButtonClick()}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Generar PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormularioView;
