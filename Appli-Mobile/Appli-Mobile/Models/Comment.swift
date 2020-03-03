//
//  Comment.swift
//  Appli-Mobile
//
//  Created by user165001 on 3/3/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

struct Comment  {
    let _id : String
    let postId : String
    let titreCom : String
    let texteCom: String
    let voteCom : Int
    let dateCome : Date
    let user : User?
    
    init(_id : String, postId : String, titreCom : String ,texteCom: String,voteCom : Int,dateCome : Date, user : User?) {
        
        self._id=_id
        self.postId=postId
        self.titreCom=titreCom
        self.texteCom=texteCom
        self.voteCom=voteCom
        self.dateCome=dateCome
        self.user=user
    }
    
}
