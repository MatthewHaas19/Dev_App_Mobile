//
//  User.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/17/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

class UserPost {
    
    var email: String
    var password: String
    var username: String
    var posts : [String]
    
    init(email:String,password:String,username:String,posts:[String]){
        
        self.email = email
        self.password = password
        self.username = username
        self.posts = posts
        
    }
    
}
