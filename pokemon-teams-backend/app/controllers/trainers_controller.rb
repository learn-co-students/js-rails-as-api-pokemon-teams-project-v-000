class TrainersController < ApplicationController
	def index
		# binding.pry
		@trainers = Trainer.all
		render json: @trainers, include: [:pokemons]
	end
end
