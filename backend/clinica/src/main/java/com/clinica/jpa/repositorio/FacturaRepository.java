package com.clinica.jpa.repositorio;

import com.clinica.jpa.modelo.Factura;
import com.clinica.jpa.modelo.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FacturaRepository extends JpaRepository<Factura, Long> {
    List<Factura> findByPaciente(Paciente paciente);
    List<Factura> findByMetodoPago(Factura.MetodoPago metodoPago);
}
