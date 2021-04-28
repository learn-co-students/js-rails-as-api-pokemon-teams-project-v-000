class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        options = {include: [:trainer]}
        render json: PokemonSerializer.new(pokemons, options)
    end

    def show
        pokemon = Pokemon.find_by(params[:id])
        render json: PokemonSerializer.new(pokemon)
    end  

    def create
        trainer = Trainer.find(params["pokemon"]["trainer_id"])
        
        if trainer.pokemons.count >= 6 
          render json: { error: "Party is Full!"}, status: 403
        else 
          pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer: trainer)
          render json: pokemon, status: 200
        end
      end
    
      def destroy
        pokemon = Pokemon.find(params[:id])
        unless pokemon.nil?
          pokemon.destroy
          render json: pokemon
        else
          render json: { error: "Pokemon not Found!" }, status: 404
        end
      end
end
