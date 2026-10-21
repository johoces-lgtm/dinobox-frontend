import React, { useState } from 'react';
import EncomiendaService from '../services/EncomiendaService';
import 'bootstrap/dist/css/bootstrap.min.css';

const EncomiendaApp = () => {
    const [codigoBusqueda, setCodigoBusqueda] = useState('DINO100');
    const [encomienda, setEncomienda] = useState(null);
    const [error, setError] = useState('');

    // Formulario de Registro (POST)
    const [destinatario, setDestinatario] = useState('');
    const [direccion, setDireccion] = useState('');
    const [mensajePost, setMensajePost] = useState('');

    // Formulario de Actualización (PUT)
    const [nuevoEstado, setNuevoEstado] = useState('En Tránsito');
    const [ubicacion, setUbicacion] = useState('');
    const [mensajePut, setMensajePut] = useState('');

    const ESTADOS = ["En Recepción", "En Despacho", "En Tránsito", "Entregado"];

    // Buscar encomienda por código (GET)
    const handleBuscar = (e) => {
        e.preventDefault();
        setError('');
        EncomiendaService.obtenerPorCodigo(codigoBusqueda)
            .then(response => {
                setEncomienda(response.data);
            })
            .catch(err => {
                setEncomienda(null);
                setError('No se encontró la encomienda con ese código.');
            });
    };

    // Registrar nueva encomienda (POST)
    const handleRegistrar = (e) => {
        e.preventDefault();
        EncomiendaService.registrarEncomienda({ destinatario, direccion })
            .then(response => {
                setMensajePost(`¡Registrado con éxito! Código: ${response.data.codigoSeguimiento}`);
                setCodigoBusqueda(response.data.codigoSeguimiento);
                setDestinatario('');
                setDireccion('');
            })
            .catch(err => setMensajePost('Error al registrar encomienda.'));
    };

    // Actualizar estado (PUT)
    const handleActualizar = (e) => {
        e.preventDefault();
        EncomiendaService.actualizarEstado(codigoBusqueda, { estado: nuevoEstado, ubicacion })
            .then(response => {
                setMensajePut('Estado actualizado correctamente.');
                setEncomienda(response.data.encomienda);
                setUbicacion('');
            })
            .catch(err => setMensajePut('Error al actualizar estado.'));
    };

    return (
        <div style={{ backgroundColor: '#f6f2ff', minHeight: '100vh', paddingBottom: '50px' }}>

            <div className="container">
                {/* BUSCADOR (GET) */}
                <div className="card shadow-sm p-4 mb-4 border-0" style={{ borderRadius: '12px' }}>
                    <h3 className="fw-bold mb-3" style={{ color: '#2d1457' }}>Consultar Encomienda</h3>
                    <form onSubmit={handleBuscar} className="input-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={codigoBusqueda} 
                            onChange={(e) => setCodigoBusqueda(e.target.value)} 
                            placeholder="Ej: DINO101"
                            required
                        />
                        <button className="btn text-white" style={{ backgroundColor: '#6f42c1' }} type="submit">Buscar</button>
                    </form>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </div>

                {/* TARJETAS DE ESTADO VISUAL */}
                {encomienda && (
                    <div className="row g-3 mb-4">
                        {ESTADOS.map(est => {
                            const isActive = encomienda.estado === est;
                            return (
                                <div className="col-md-3" key={est}>
                                    <div className="card p-3 text-center h-100 shadow-sm" style={{
                                        backgroundColor: isActive ? '#6f42c1' : '#ffffff',
                                        color: isActive ? '#ffffff' : '#2d1457',
                                        borderRadius: '12px',
                                        border: '2px solid #e2d9f3'
                                    }}>
                                        <h5>{est}</h5>
                                        <p className="small mb-0">{isActive ? 'Estado Actual' : '---'}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* INFORMACIÓN E HISTORIAL */}
                {encomienda && (
                    <div className="card shadow-sm p-4 mb-4 border-0" style={{ borderRadius: '12px' }}>
                        <h4 className="fw-bold" style={{ color: '#2d1457' }}>Detalles de Envío</h4>
                        <p><strong>Destinatario:</strong> {encomienda.destinatario}</p>
                        <p><strong>Dirección:</strong> {encomienda.direccion}</p>
                        <hr />
                        <h5 className="fw-bold">Historial de Viaje:</h5>
                        <p className="p-3 bg-light rounded" style={{ whiteSpace: 'pre-line' }}>{encomienda.historial}</p>
                    </div>
                )}

                {/* PANELES DE ACCIÓN (POST Y PUT) */}
                <div className="row g-4">
                    {/* POST */}
                    <div className="col-md-6">
                        <div className="card shadow-sm p-4 h-100 border-0" style={{ borderRadius: '12px' }}>
                            <h5 className="fw-bold mb-3" style={{ color: '#2d1457' }}>➕ Registrar Nueva Encomienda (POST)</h5>
                            <form onSubmit={handleRegistrar}>
                                <input 
                                    type="text" 
                                    className="form-control mb-2" 
                                    placeholder="Nombre Destinatario" 
                                    value={destinatario} 
                                    onChange={(e) => setDestinatario(e.target.value)}
                                    required
                                />
                                <input 
                                    type="text" 
                                    className="form-control mb-3" 
                                    placeholder="Dirección / Destino" 
                                    value={direccion} 
                                    onChange={(e) => setDireccion(e.target.value)}
                                    required
                                />
                                <button className="btn w-100 text-white" style={{ backgroundColor: '#6f42c1' }} type="submit">Registrar</button>
                            </form>
                            {mensajePost && <p className="text-success mt-2 fw-bold">{mensajePost}</p>}
                        </div>
                    </div>

                    {/* PUT */}
                    <div className="col-md-6">
                        <div className="card shadow-sm p-4 h-100 border-0" style={{ borderRadius: '12px' }}>
                            <h5 className="fw-bold mb-3" style={{ color: '#2d1457' }}>🔄 Actualizar Estado (PUT)</h5>
                            <form onSubmit={handleActualizar}>
                                <select 
                                    className="form-select mb-2" 
                                    value={nuevoEstado} 
                                    onChange={(e) => setNuevoEstado(e.target.value)}
                                >
                                    {ESTADOS.map(est => <option key={est} value={est}>{est}</option>)}
                                </select>
                                <input 
                                    type="text" 
                                    className="form-control mb-3" 
                                    placeholder="Ubicación actual (Ej: Centro de Distribución)" 
                                    value={ubicacion} 
                                    onChange={(e) => setUbicacion(e.target.value)}
                                    required
                                />
                                <button className="btn w-100 text-white" style={{ backgroundColor: '#6f42c1' }} type="submit">Actualizar Estado</button>
                            </form>
                            {mensajePut && <p className="text-success mt-2 fw-bold">{mensajePut}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EncomiendaApp;