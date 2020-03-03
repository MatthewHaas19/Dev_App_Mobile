//
//  Comment.swift
//  Appli-Mobile
//
//  Created by user165001 on 3/3/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

class Comment : Decodable, Identifiable, CustomStringConvertible {
  
    
    var _id : String
    var description: String {return " \(self.titreCom) "}
    let postId : String
    let titreCom : String
    let texteCom: String
    let voteCom : Int
    let dateCom : String
    let user : String
    
    init(_id : String, postId : String, titreCom : String ,texteCom: String,voteCom : Int,dateCome : String, user : String) {
        
        self._id=_id
        self.postId=postId
        self.titreCom=titreCom
        self.texteCom=texteCom
        self.voteCom=voteCom
        self.dateCom=dateCome
        self.user=user
    }
    
}
