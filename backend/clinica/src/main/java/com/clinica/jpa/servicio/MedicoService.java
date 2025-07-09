package com.clinica.jpa.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Especialidad;
import com.clinica.jpa.repositorio.MedicoRepository;
import com.clinica.jpa.repositorio.EspecialidadRepository;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private EspecialidadRepository especialidadRepository;

    // CREAR
    public Medico crearMedico(Medico medico) {
        Long idEsp = medico.getEspecialidad() != null
                   ? medico.getEspecialidad().getIdEspecialidad()
                   : null;

        if (idEsp == null)
            throw new RuntimeException("Especialidad obligatoria");

        Especialidad esp = especialidadRepository.findById(idEsp)
                .orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));

        medico.setEspecialidad(esp);
        return medicoRepository.save(medico);
    }

    // ACTUALIZAR
    public Medico actualizarMedico(Long id, Medico medicoActualizado) {
        Medico medico = medicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médico no encontrado con ID: " + id));

        medico.setNombre(medicoActualizado.getNombre());
        medico.setApellido(medicoActualizado.getApellido());
        medico.setCorreoElectronico(medicoActualizado.getCorreoElectronico());
        medico.setTelefono(medicoActualizado.getTelefono());
        medico.setFechaRegistro(medicoActualizado.getFechaRegistro());

        // Aca para validar especialidad
        if (medicoActualizado.getEspecialidad() == null || medicoActualizado.getEspecialidad().getIdEspecialidad() == null) {
            throw new RuntimeException("Especialidad obligatoria");
        }

        Especialidad especialidad = especialidadRepository.findById(medicoActualizado.getEspecialidad().getIdEspecialidad())
                .orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));

        medico.setEspecialidad(especialidad);

        return medicoRepository.save(medico);
    }

    public List<Medico> obtenerTodosMedicos() {
        return medicoRepository.findAll();
    }

    public Optional<Medico> obtenerMedicoPorId(Long id) {
        return medicoRepository.findById(id);
    }

    public List<Medico> buscarMedicoPorNombre(String nombre) {
        return medicoRepository.findByNombre(nombre);
    }

    public List<Medico> buscarMedicoPorEspecialidad(String nombreEspecialidad) {
        return especialidadRepository.findByNombre(nombreEspecialidad)
                .map(medicoRepository::findByEspecialidad)
                .orElse(List.of());
    }

    public void eliminarMedico(Long id) {
        medicoRepository.deleteById(id);
    }
}

