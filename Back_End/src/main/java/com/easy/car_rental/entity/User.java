package com.easy.car_rental.entity;

import com.easy.car_rental.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    @Id
    private String user_Id;
    @Enumerated(EnumType.STRING)
    private RoleType role_Type;
    private String user_Name;
    private String password;

    public User(RoleType role_Type, String user_Name, String password) {
        this.role_Type = role_Type;
        this.user_Name = user_Name;
        this.password = password;
    }

}
