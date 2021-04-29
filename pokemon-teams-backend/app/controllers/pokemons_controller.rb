class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
      end
     
    def create

      pokemon = Pokemon.new
      pokemon.nickname = Faker::Name.first_name
      pokemon.species =  Faker::Games::Pokemon.name
      pokemon.trainer_id= params[:trainer_id]
      pokemon.save
      render json: PokemonSerializer.new(pokemon)
    end 

    def destroy
      @pokemon = Pokemon.find(params[:id])
      @pokemon.destroy
    end  
end
