//
//  ListByCategorie.swift
//  Appli-Mobile
//
//  Created by Timothée Temil on 02/03/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct ListByCategorie: View {

    var nameCategorie : String
    
    var body: some View {
        
        ZStack{
        Color.white
        Text(nameCategorie)
        }
    }
}

struct ListByCategorie_Previews: PreviewProvider {
    static var previews: some View {
        ListByCategorie(nameCategorie:"Preview")
    }
}
