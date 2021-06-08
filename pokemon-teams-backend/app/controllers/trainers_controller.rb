class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        # options = { include: [:pokemon] }
        render json: TrainerSerializer.new(trainers).to_serialized_json
    #    render json: trainers.to_json(:include => {
    #   :pokemons => {:only => [:name]},
    # }, :except => [:updated_at])
  end

      def show
        trainer = Trainer.find_by(id: params[:id])
        options = { include: [:pokemon] }
        render json: TrainerSerializer.new(trainer)

        
      end
end
