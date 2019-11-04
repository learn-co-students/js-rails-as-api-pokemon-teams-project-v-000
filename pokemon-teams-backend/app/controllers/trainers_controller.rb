class TrainersController < ApplicationController
    def index 
       trainers = Trainer.all 
       
       render json: trainers.to_json(:include => {
           :pokemons => { :only => [:species, :nickname, :trainer_id]}
       }, :except => [:created_at, :updated_at])
    end

    def show
        # trainer = Trainer.find(params[:id])
        # options = {include: [:pokemons]}
        # render json: TrainerSerializer.new(trainer, options)
        trainer = Trainer.find(params[:id])
        render json: trainer.to_json(:include => {
            :pokemons => {:only => [:species, :nickname, :trainer_id]}
            }, :except => [:created_at, :updated_at])
    end
end
