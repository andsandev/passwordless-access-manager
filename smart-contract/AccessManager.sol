// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importar Ownable de OpenZeppelin para control de ownership
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title AccessManager - Gestión segura de accesos con roles
/// @author Andres Sanchez
/// @notice Contrato seguro para controlar acceso de usuarios mediante blockchain
contract AccessManager is Ownable {

    // Mapping de acceso de usuarios
    mapping(address => bool) private _hasAccess;

    // Eventos
    event AccessGranted(address indexed user, address indexed grantedBy);
    event AccessRevoked(address indexed user, address indexed revokedBy);

    /// @notice Asigna acceso a un usuario
    /// @param user Dirección del usuario
    function grantAccess(address user) external onlyOwner {
        require(user != address(0), "Invalid address");
        require(!_hasAccess[user], "User already has access");
        
        _hasAccess[user] = true;
        emit AccessGranted(user, msg.sender);
    }

    /// @notice Revoca acceso a un usuario
    /// @param user Dirección del usuario
    function revokeAccess(address user) external onlyOwner {
        require(user != address(0), "Invalid address");
        require(_hasAccess[user], "User does not have access");

        _hasAccess[user] = false;
        emit AccessRevoked(user, msg.sender);
    }

    /// @notice Consulta si un usuario tiene acceso
    /// @param user Dirección del usuario
    /// @return bool True si tiene acceso
    function hasAccess(address user) external view returns(bool) {
        return _hasAccess[user];
    }

    /// @notice Función de emergencia para transferir ownership
    /// Permite cambiar el propietario en caso de pérdida de claves
    /// @param newOwner Nueva dirección del propietario
    function emergencyTransferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        transferOwnership(newOwner);
    }
}
