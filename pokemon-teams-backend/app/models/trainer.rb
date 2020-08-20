class Trainer < ApplicationRecord
    has_many :pokemons
    validates_length_of :pokemons, maximum: 6
end
