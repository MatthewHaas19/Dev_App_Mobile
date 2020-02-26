//
//  RowUserView.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/17/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct RowUserView: View {
    var person: User
    var body: some View {
        Text(person.username)
    }
}

struct RowUserView_Previews: PreviewProvider {
    static var previews: some View {
        RowUserView(person:User(id:"1",email:"a@a.fr",password: "aa",username: "Matt",posts:[]))
    }
}
