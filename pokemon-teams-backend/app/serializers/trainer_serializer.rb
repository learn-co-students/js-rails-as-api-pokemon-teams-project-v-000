class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :pokemons
  def pokemons 
     self.object.pokemons.map do |p|
      {
        name: pokemon.nickname
      }
    end
  end   
   has_many :pokemons
end
