// added username field to updateUser mutation for testing.
const mutations = {
  login: `
    mutation($email: String!, $password:String!) {
      login(email: $email, password:$password)
    }`,
  register: `
  mutation($email: String!, $username:String!, $password:String!) {
    createUser(input: {email: $email, username: $username, password: $password})
  }`,
  saveRoute: `
    mutation($userId: ID!, $routeId: ID!) {
      saveRoute(userId: $userId, routeId: $routeId) {
        _id
        saved_routes {
          _id
        }
      }
    }`,
  unsaveRoute: `
    mutation($userId: ID!, $routeId: ID!) {
      unsaveRoute(userId: $userId, routeId: $routeId) {
        _id
        saved_routes {
          _id
        }
      }
    }`,
  createRoute: `
    mutation($name: String!, $grade: String!, $public:Boolean!, $author: ID!, $lat: String!, $lng: String!, $type: String!, $picture: FileUpload, $description: String) {
      createRoute(input: {
        name: $name,
        grade: $grade,
        public: $public,
        author: $author,
        lat: $lat,
        lng: $lng,
        type: $type,
        picture: $picture,
        description: $description
      }) {
        _id
      }
    }`,
  updateRoute: `
  mutation($_id: ID!, $name: String!, $grade: String!, $public:Boolean!, $type: String!, $picture: FileUpload, $description: String) {
    updateRoute(
      _id: $_id,
      input: {
      name: $name,
      grade: $grade,
      public: $public,
      type: $type,
      picture: $picture,
      description: $description
    }) {
      _id
      name
      grade
      public
      type
      description
      lat
      lng
    }
  }`,
  updateUser: `
  mutation($_id:ID! ,$username: String!, $profile_picture: FileUpload){
    updateUser(_id:$_id, input: {username: $username, profile_picture:$profile_picture}){
      _id
      username
    }
  }`

};
export default mutations;
