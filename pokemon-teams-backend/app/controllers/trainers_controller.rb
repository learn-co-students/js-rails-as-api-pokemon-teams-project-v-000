class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        options = {
            # include: [:pokemons]
            # include: [:pokemon]
            # includes: [:pokemons]
            includes: [:pokemon]
        }
        # render json: TrainerSerializer.new(trainers).to_json #DID NOT WORK
        # render json: [trainers, options]
        render json: trainers
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        options = {
            # include: [:pokemons].
            include: [:pokemon]
        }
        # render json: TrainerSerializer.new(trainer) #DID NOT WORK
        render json: trainer
    end
end