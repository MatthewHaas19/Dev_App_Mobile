//
//  Comment.swift
//  Appli-Mobile
//
//  Created by user165001 on 3/3/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

class CommentPost : Decodable, Identifiable {
  

    let postId : String
    let titreCom : String
    let texteCom: String
    let voteCom : Int
    let dateCom : String
    let user : String
    let isAnonyme : Bool
    
    
    
    init( postId : String, titreCom : String ,texteCom: String,voteCom : Int,dateCome : String, user : String, isAnonyme:Bool) {
        
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        
        self.postId=postId
        self.titreCom=titreCom
        self.texteCom=texteCom
        self.voteCom=voteCom
        self.dateCom=formatter.string(from: Date())
        self.user=user
        self.isAnonyme=isAnonyme
    }
    
}
