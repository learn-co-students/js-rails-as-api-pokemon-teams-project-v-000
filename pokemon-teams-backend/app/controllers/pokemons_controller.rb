class PokemonsController < ApplicationController


    def index
        pokemons = Pokemon.all
        render json: pokemonSerializer.new(pokemons)
        
    end

     def create
         
     end
   

     def destroy
         
     end



end
