



import SwiftUI

struct MyPostView: View {
    
    @ObservedObject var userDAO = UserDAO()
    @ObservedObject var postDAO = PostDAO()
    @ObservedObject var voteDAO = VotesDAO()
    
    
    @State var posts : [Post]
    var navigatePost: (Post) -> ()
    var navigateVote: (Int,Post) -> ()
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
                    
                    ForEach(0..<posts.count){
                        index in
                        ZStack{
                            RowPostView(post:self.posts[index],localisation: "",navigatePost:{
                                post in
                                self.navigatePost(post)
                            },afficherEntier:false,navigateVote:{
                                res,post in
                                
                                self.voteDAO.addVotes(vote: Vote(user:self.user,post:self.posts[index]._id,like:res), completionHandler: {
                                    result in
                                    if(result==1){
                                        self.postDAO.addVote(vote: Vote(user:self.user,post:self.posts[index]._id,like:res),post:post, completionHandler: {
                                            bool in
                                            //print(res)
                                            
                                            if(res){
                                                self.posts[index].note = self.posts[index].note + 1
                                            }else{
                                                self.posts[index].note = self.posts[index].note - 1
                                            }
                                            self.posts.append(Post(id : "idid" ,titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: ["Montpellier"], categorie: ["Dans la rue"], note: 156, date: "08/12",user:"mail", isAnonyme: true , couleur:[1.00,1.00,1.00]))
                                            self.posts.remove(at: self.posts.count-1)
                                            
                                        })
                                    }
                                    else if(result==2){
                                        self.postDAO.addVote(vote: Vote(user:self.user,post:self.posts[index]._id,like:res),post:post, completionHandler: {
                                            bool in
                                        })
                                        self.postDAO.addVote(vote: Vote(user:self.user,post:self.posts[index]._id,like:res),post:post, completionHandler: {
                                            bool in
                                            
                                            
                                            if(res){
                                                self.posts[index].note = self.posts[index].note + 2
                                            }else{
                                                self.posts[index].note = self.posts[index].note - 2
                                            }
                                            self.posts.append(Post(id : "idid" ,titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: ["Montpellier"], categorie: ["Dans la rue"], note: 156, date: "08/12",user:"mail", isAnonyme: true , couleur:[1.00,1.00,1.00]))
                                            self.posts.remove(at: self.posts.count-1)
                                            
                                        })
                                    }
                                })
                            }).padding(.bottom)
                            
                            
                        }.listRowBackground(
                            VStack{
                                Color(red:self.posts[index].couleur[0],green:self.posts[index].couleur[1],blue:self.posts[index].couleur[2])
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
        let p = posts[indexSet.first!]
        self.posts.remove(at: indexSet.first!)
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
