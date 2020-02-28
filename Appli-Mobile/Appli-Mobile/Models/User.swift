//
//  User.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/17/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

class User : Decodable, Identifiable, CustomStringConvertible{
    
    var _id: String
    var description: String {return " \(self.username) "}
    var email: String
    var password: String
    var username: String
    var posts : [String]?
    
    init(id:String,email:String,password:String,username:String,posts:[String]?){
        
        self._id = id
        self.email = email
        self.password = password
        self.username = username
        self.posts = posts
        
    }
    
}
