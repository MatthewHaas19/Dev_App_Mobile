//
//  Post.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 23/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//



import Foundation


struct Commentaire  {
    let titreCom : String
    let texteCom: String
    let voteCom : Int
    let dateCome : Date
    let user : User?
    
    init(titreCom : String ,texteCom: String,voteCom : Int,dateCome : Date, user : User?) {
        
        self.titreCom=titreCom
        self.texteCom=texteCom
        self.voteCom=voteCom
        self.dateCome=dateCome
        self.user=user
    }
    
}

class Post : Decodable, Identifiable, CustomStringConvertible {
    
    
    var _id: String
    var description: String {return " \(self.titre) "}
    var titre: String
    var texte: String
    var nbSignalement : Int
    var image : String?
    var localisation : String
    var categorie : [String]
    var note : Int
    var commentaire : [String]?
    var date : String
    var user : String
 
    
    init(id : String , titre:String,texte:String,nbSignalement : Int,image:String?,localisation:String,categorie : [String],note:Int,commentaire:[String]?,date:String,user:String){
        self._id = id
        self.titre = titre
        self.texte = texte
        self.nbSignalement=nbSignalement
        self.image=image
        self.localisation=localisation
        self.categorie=categorie
        self.note = note
        self.commentaire=commentaire
        self.date=date
        self.user=user
        
    }
}
