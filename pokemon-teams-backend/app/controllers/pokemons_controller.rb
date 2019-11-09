class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def create
        # use Faker to create a fake pokemon
        # binding.pry
        # render json too many json 
        trainer_id = params[:pokemon][:trainerId]
        # binding.pry
        pokemon = Pokemon.create!(trainer_id: trainer_id, nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
        
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def destroy
       pokemon = Pokemon.find(params[:id])
       pokemon.delete 
       render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    # def pokemon_params
    #     params.permit(:nickname, :species, :trainer_id)
        
    # end
end
