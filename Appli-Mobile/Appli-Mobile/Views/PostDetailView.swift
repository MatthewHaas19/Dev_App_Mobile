//
//  PostDetailView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct PostDetailView: View {
    
    @ObservedObject var reportDAO = ReportDAO()
    
    @State private var showingAlert = false
    
    var post : Post
    var currentUser : String?
    
    var body: some View {
        
        
        
        ZStack {
            
            Color.white
            VStack{
                Text(post.titre)
                Text(post.texte)
            }
                   
            VStack{
                Spacer()
                if ( self.currentUser != nil) {
                    HStack{
                        Spacer()
                        Button(action:{
                            self.showingAlert = true
                            print("test")
                        })
                        {
                            Text("Signaler")
                        }.foregroundColor(.red)
                    }.padding(.bottom)
                    .padding(.trailing,30)
                    .alert(isPresented: $showingAlert) {
                        Alert(title: Text("Signaler le post"), message: Text("Etes-vous sû de vouloir signaler le post ?"), primaryButton: .cancel(Text("Annuler")
                            ), secondaryButton: .destructive(Text("Signaler"), action: {
                                self.addReport()
                            }))
                    }
                }
                
            }
                     
                // A FAIRE QUAND ON AURA BIEN MIS LES COMMENTAIRE CORRESPONDANT AU POST DASN LA BDD
            }
    }
    
    
    func addReport(){
        
        let report = Report(emailUser : self.currentUser!, idPost : post._id)
            
            self.reportDAO.addReport(report: report, completionHandler: {
                res in
                if(res == 1){
                    print("Signalé")
                }
                else if (res == 0){
                    print("Déjà signalé")
                }
                else {
                    print("erreur")
                }
            })
        }
        
    
    
    
}







 struct PostDetailView_Previews: PreviewProvider {
 static var previews: some View {
 PostDetailView(post:Post(id : "idid" ,titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: "Montpellier", categorie: ["Dans la rue"], note: 156, date: "08/12",user:"mail"))
 }
 }
