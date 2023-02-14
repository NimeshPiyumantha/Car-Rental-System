package com.easy.car_rental.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Data
@NoArgsConstructor
@ToString
public class UserDTO {
    private String user_Id;
    private String role_Type;
    private String user_Name;
    private String password;

    public UserDTO(String role_Type, String user_Name, String password) {
        this.role_Type = role_Type;
        this.user_Name = user_Name;
        this.password = password;
    }

}
