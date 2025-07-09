package com.clinica.jpa.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.clinica.jpa.modelo.ConsultaMedica;
import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Paciente;
import com.clinica.jpa.servicio.ConsultaMedicaService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/consultas")
public class ConsultaMedicaController {

    @Autowired
    private ConsultaMedicaService consultaMedicaService;

    @PostMapping
    public ConsultaMedica crearConsultaMedica(@RequestBody ConsultaMedica consultaMedica) {
        return consultaMedicaService.crearConsultaMedica(consultaMedica);
    }

    @GetMapping
    public List<ConsultaMedica> obtenerTodasConsultas() {
        return consultaMedicaService.obtenerTodasConsultas();
    }

    @GetMapping("/{id}")
    public Optional<ConsultaMedica> obtenerConsultaPorId(@PathVariable Long id) {
        return consultaMedicaService.obtenerConsultaPorId(id);
    }

    // Aquí se ajusta para que reciba el ID del paciente como parámetro simple
    @GetMapping("/buscarPorPaciente")
    public List<ConsultaMedica> buscarConsultasPorPaciente(@RequestParam Long idPaciente) {
        Paciente paciente = new Paciente();
        paciente.setIdPaciente(idPaciente);
        return consultaMedicaService.buscarConsultasPorPaciente(paciente);
    }

    //  Igual aquí tambien , se ajusta para que reciba solo el ID del médico
    @GetMapping("/buscarPorMedico")
    public List<ConsultaMedica> buscarConsultasPorMedico(@RequestParam Long idMedico) {
        Medico medico = new Medico();
        medico.setIdMedico(idMedico);
        return consultaMedicaService.buscarConsultasPorMedico(medico);
    }

    @DeleteMapping("/{id}")
    public void eliminarConsulta(@PathVariable Long id) {
        consultaMedicaService.eliminarConsulta(id);
    }
}
