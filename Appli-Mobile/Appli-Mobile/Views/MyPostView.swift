



import SwiftUI

struct MyPostView: View {
    
    @ObservedObject var userDAO = UserDAO()
    @ObservedObject var postDAO = PostDAO()
    

    var navigatePost: (Post) -> ()
    var navigateVote: (Bool,Post) -> ()
    //var post:Post = Post( id : "idid", titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: "Montpellier", categorie: [ "Dans la rue"], note: 156, commentaire: nil, date: "08/12",user:"mail")
    
    var colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]
    
    var user : String
    
    var body: some View {
        ZStack{
            Color.white.edgesIgnoringSafeArea(.all)
            VStack{
                Text("MES POSTS")
                    .font(.largeTitle)
                    .fontWeight(.semibold)
                Spacer().frame(height:50)
                
                List(){
                    
                    ForEach(postDAO.posts){
                        p in
                        ZStack{
                            RowPostView(post:p,localisation: "",navigatePost:{
                                post in
                                self.navigatePost(post)
                            },afficherEntier:false,navigateVote:{
                                res,post in
                                self.navigateVote(res,post)
                            }).padding(.bottom)
                            
                            
                        }.listRowBackground(
                            VStack{
                                Color(red:p.couleur[0],green:p.couleur[1],blue:p.couleur[2])
                                Spacer()
                        })
                            .padding(.top)
                        
                        
                    }.onDelete { (indexSet) in self.deletePost(indexSet: indexSet)}
                    .buttonStyle(BorderlessButtonStyle())
                    
                }
            }.padding(.top,130)

        }
        
    }

    
    func deletePost(indexSet : IndexSet){
        print("On veut supprimer : ")
        let p = postDAO.posts[indexSet.first!]
        print(p)
        postDAO.delete(post : p , completionHandler: {
            res in
            if(res){
                print("bien supprimé")
            }
            else{
                print("delete post error")
            }
        })
    }
}
