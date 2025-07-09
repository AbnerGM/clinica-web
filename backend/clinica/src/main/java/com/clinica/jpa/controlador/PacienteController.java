

package com.clinica.jpa.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clinica.jpa.modelo.Paciente;
import com.clinica.jpa.servicio.PacienteService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping
    public Paciente crearPaciente(@RequestBody Paciente paciente) {
        return pacienteService.crearPaciente(paciente);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Paciente> actualizarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteActualizado) {
        Optional<Paciente> pacienteExistente = pacienteService.obtenerPacientePorId(id);
        
        if (pacienteExistente.isPresent()) {
            pacienteActualizado.setIdPaciente(id); 
            Paciente paciente = pacienteService.actualizarPaciente(id, pacienteActualizado);
            return ResponseEntity.ok(paciente);
        }
        
        return ResponseEntity.status(404).build(); 
    }

    @GetMapping
    public List<Paciente> obtenerTodosPacientes() {
        return pacienteService.obtenerTodosPacientes();
    }

    @GetMapping("/{id}")
    public Optional<Paciente> obtenerPacientePorId(@PathVariable Long id) {
        return pacienteService.obtenerPacientePorId(id);
    }

    @GetMapping("/buscarPorNombre")
    public List<Paciente> buscarPacientePorNombre(@RequestParam String nombre) {
        return pacienteService.buscarPacientePorNombre(nombre);
    }

    @GetMapping("/buscarPorApellido")
    public List<Paciente> buscarPacientePorApellido(@RequestParam String apellido) {
        return pacienteService.buscarPacientePorApellido(apellido);
    }

    @DeleteMapping("/{id}")
    public void eliminarPaciente(@PathVariable Long id) {
        pacienteService.eliminarPaciente(id);
    }
}

