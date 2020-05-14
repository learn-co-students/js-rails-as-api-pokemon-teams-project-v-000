class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find(params["pokemon"]["trainer_id"]) 

        if trainer.pokemons.count >= 6
            render json: {error: "Party is Full!"}, status: 403
        else
            pokemon = Pokemon.create()
            render json: pokemon, status: 200
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        unless pokemon.nil?
            pokemon.destroy
            render json: pokemon
        else
            render json: {error: "Pokemon not Found!" }, status: 404
        end
    end
end

=begin
    
When a user loads the page, they should see all trainers, with their current team of Pokemon.
Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.
Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.

=end