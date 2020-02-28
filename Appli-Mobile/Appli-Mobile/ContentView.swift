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


    //var colors:[Color] = [Color(red:1.0,green:0.6,blue:0.6),Color(red:0.3,green:0.55,blue:0.55),Color(red:0.3,green:0.55,blue:0.3),Color(red:0.3,green:0.3,blue:0.55)]
    var colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]



    var post:Post = Post(title: "Wsh t'es charmante, ça te dirait une glace à la menthe",description:"On m'a dit ça l'autre jour dans la rue")



    var body: some View {

        RouterView()

    }

}



struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
