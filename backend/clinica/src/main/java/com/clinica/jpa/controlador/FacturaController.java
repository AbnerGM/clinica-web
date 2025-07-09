package com.clinica.jpa.controlador;

import com.clinica.jpa.modelo.Factura;
import com.clinica.jpa.servicio.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/facturas")
public class FacturaController {

    @Autowired
    private FacturaService service;

    @GetMapping public List<Factura> listar() { return service.obtenerTodas(); }

    @PostMapping public Factura crear(@RequestBody Factura f) { return service.crear(f); }

    @GetMapping("/{id}") public Optional<Factura> porId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @GetMapping("/buscarPorPaciente")
    public List<Factura> porPaciente(@RequestParam Long idPaciente) {
        return service.buscarPorPaciente(idPaciente);
    }

    @GetMapping("/buscarPorMetodoPago")
    public List<Factura> porMetodo(@RequestParam Factura.MetodoPago metodoPago) {
        return service.buscarPorMetodoPago(metodoPago);
    }

    @DeleteMapping("/{id}") public void eliminar(@PathVariable Long id) { service.eliminar(id); }
}
