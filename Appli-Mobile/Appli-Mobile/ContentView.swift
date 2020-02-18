//
//  ContentView.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/17/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI
import Combine

struct ContentView: View {
    
    @ObservedObject var userDAO = UserDAO()
    

    var body: some View {
        VStack{
            Text("L'application de Temil, Juju & Matt")
            Text("Utilisateurs :")
            Spacer()
            List(userDAO.users){person in
                RowUserView(person:person)
            }
        }
    }
    
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
