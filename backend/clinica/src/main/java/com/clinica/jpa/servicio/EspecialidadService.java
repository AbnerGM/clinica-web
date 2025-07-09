package com.clinica.jpa.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.clinica.jpa.modelo.Especialidad;
import com.clinica.jpa.repositorio.EspecialidadRepository;

@Service
public class EspecialidadService {

    @Autowired
    private EspecialidadRepository repo;

    public List<Especialidad> obtenerTodas() {
        return repo.findAll();
    }

    public Especialidad guardar(Especialidad e) {
        return repo.save(e);
    }

    public Optional<Especialidad> porId(Long id) {
        return repo.findById(id);
    }

    public Optional<Especialidad> porNombre(String nombre) {
        return repo.findByNombre(nombre);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
    public List<Especialidad> buscarPorNombreParcial(String nombre) {
        return repo.findByNombreContainingIgnoreCase(nombre);
    }
}
