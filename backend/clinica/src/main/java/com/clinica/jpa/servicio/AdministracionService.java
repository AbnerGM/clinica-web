package com.clinica.jpa.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.jpa.modelo.Administracion;
import com.clinica.jpa.repositorio.AdministracionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AdministracionService {

    @Autowired
    private AdministracionRepository administracionRepository;

    public Administracion crearAdministracion(Administracion administracion) {
        return administracionRepository.save(administracion);
    }

    public List<Administracion> obtenerTodasAdministraciones() {
        return administracionRepository.findAll();
    }

    public Optional<Administracion> obtenerAdministracionPorId(Long id) {
        return administracionRepository.findById(id);
    }

    public List<Administracion> buscarAdministracionPorNombre(String nombre) {
        return administracionRepository.findByNombre(nombre);
    }

    public void eliminarAdministracion(Long id) {
        administracionRepository.deleteById(id);
    }
}
