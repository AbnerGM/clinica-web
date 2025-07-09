package com.clinica.jpa.servicio;

import com.clinica.jpa.modelo.Factura;
import com.clinica.jpa.modelo.Paciente;
import com.clinica.jpa.repositorio.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FacturaService {

    @Autowired
    private FacturaRepository repo;

    public Factura crear(Factura f) { return repo.save(f); }
    public List<Factura> obtenerTodas() { return repo.findAll(); }
    public Optional<Factura> obtenerPorId(Long id) { return repo.findById(id); }

    public List<Factura> buscarPorPaciente(Long idPaciente) {
        Paciente p = new Paciente();
        p.setIdPaciente(idPaciente);
        return repo.findByPaciente(p);
    }

    public List<Factura> buscarPorMetodoPago(Factura.MetodoPago m) {
        return repo.findByMetodoPago(m);
    }

    public void eliminar(Long id) { repo.deleteById(id); }
}
