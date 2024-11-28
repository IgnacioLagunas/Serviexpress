-- Crear la base de datos
CREATE DATABASE Serviexpress;
USE Serviexpress;
-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('Cliente', 'Empleado', 'Administrador') DEFAULT 'Cliente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Tabla de Servicios
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    precio INT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Tabla de Boletas
CREATE TABLE boletas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    usuario_id INT NOT NULL,
    -- Relación con usuarios
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
-- Tabla de Detalle_Boleta
CREATE TABLE detalle_boleta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    boleta_id INT NOT NULL,
    -- Relación con boletas
    servicio_id INT NOT NULL,
    -- Relación con servicios
    cantidad INT DEFAULT 1,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (boleta_id) REFERENCES boletas(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);
-- Tabla de Reservas_Horas
CREATE TABLE reservas_horas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_reserva DATE NOT NULL,
    hora_reserva TIME NOT NULL,
    usuario_id INT NOT NULL,
    -- Relación con usuarios
    servicio_id INT NOT NULL,
    -- Relación con servicios
    estado ENUM('Pendiente', 'Confirmada', 'Cancelada') DEFAULT 'Pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);
alter table servicios
add column img VARCHAR(255)
after precio;
-- Insertar usuarios (Clientes)
INSERT INTO usuarios (email, nombre, apellido, password, rol)
VALUES (
        'cliente1@example.com',
        'Juan',
        'Pérez',
        '1234',
        'Cliente'
    ),
    (
        'cliente2@example.com',
        'María',
        'González',
        '1234',
        'Cliente'
    ),
    (
        'cliente3@example.com',
        'Carlos',
        'López',
        '1234',
        'Cliente'
    );
-- Insertar usuario (Administrador)
INSERT INTO usuarios (email, nombre, apellido, password, rol)
VALUES (
        'admin@example.com',
        'Ana',
        'Martínez',
        '1234',
        'Administrador'
    );
-- Insertar usuarios (Empleados)
INSERT INTO usuarios (email, nombre, apellido, password, rol)
VALUES (
        'empleado1@example.com',
        'Luis',
        'Rodríguez',
        '1234',
        'Empleado'
    ),
    (
        'empleado2@example.com',
        'Sofía',
        'Ramírez',
        '1234',
        'Empleado'
    );