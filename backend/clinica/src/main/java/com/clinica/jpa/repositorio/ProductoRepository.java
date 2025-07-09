package com.clinica.jpa.repositorio;

import com.clinica.jpa.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
