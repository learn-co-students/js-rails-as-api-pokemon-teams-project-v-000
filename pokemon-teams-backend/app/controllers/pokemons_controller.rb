class PokemonsController < ApplicationController
    require 'pry'
       # get all trainers
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    # get one trainer
    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

    def create 
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemon.build({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })
        
        render json: pokemon.save ? pokemon : {message: pokemon.errors.messages[:team_max][0]}
        
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    
    end

end
