import { Recept, Kategorija, Sastojak } from '../models/index.js';
import { Op } from 'sequelize';
import sequelize from '../config/db.js';

// Dodaj novi recept
export const createRecept = async (req, res) => {
  try {
    const { naziv_recepta, opis, vrijeme_pripreme, vrijeme_kuhanja, porcije, url_slike, kategorija_id, sastojci } = req.body;

    const noviRecept = await Recept.create({
      naziv_recepta,
      opis,
      vrijeme_pripreme,
      vrijeme_kuhanja,
      porcije,
      url_slike,
      kategorija_id
    });

    if (Array.isArray(sastojci) && sastojci.length > 0) {
  for (const s of sastojci) {
    if (!s.naziv_sastojka || !s.kolicina) continue;

    const [sastojak] = await Sastojak.findOrCreate({
      where: { naziv_sastojka: s.naziv_sastojka.trim() }
    });

    await noviRecept.addSastojci(sastojak, {
      through: { kolicina: s.kolicina }
    });
  }
}


    const receptSaSastojcima = await Recept.findByPk(noviRecept.id, {
      include: [
        { model: Kategorija, as: 'Kategorija' },
        { model: Sastojak, as: 'sastojci', through: { attributes: ['kolicina'] } }
      ]
    });

    res.status(201).json(receptSaSastojcima);
  } catch (error) {
    console.error("Greška pri kreiranju recepta:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Dohvati sve recepte
export const getRecepti = async (req, res) => {
  try {
    const recepti = await Recept.findAll({
      include: [
        { model: Kategorija, as: 'Kategorija' },
        { model: Sastojak, as: 'sastojci' }
      ]
    });
    res.status(200).json(recepti);
  } catch (error) {
    console.error("Greška pri dohvatanju recepata:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Dohvati recept po ID
export const getReceptById = async (req, res) => {
  try {
    const recept = await Recept.findByPk(req.params.id, {
      include: [
        { model: Kategorija, as: 'Kategorija' },
        { model: Sastojak, as: 'sastojci' }
      ]
    });

    if (!recept) {
      return res.status(404).json({ message: "Recept nije pronađen." });
    }

    res.status(200).json(recept);
  } catch (error) {
    console.error("Greška pri dohvatanju recepta:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Uredi recept
export const updateRecept = async (req, res) => {
  try {
    const { naziv_recepta, opis, vrijeme_pripreme, vrijeme_kuhanja, porcije, url_slike, kategorija_id, sastojci } = req.body;

    const recept = await Recept.findByPk(req.params.id);
    if (!recept) {
      return res.status(404).json({ message: "Recept nije pronađen." });
    }

    await recept.update({
      naziv_recepta: naziv_recepta || recept.naziv_recepta, // ako nije poslan, koristi postojeći naziv
      opis: opis || recept.opis,
      vrijeme_pripreme: vrijeme_pripreme || recept.vrijeme_pripreme,
      vrijeme_kuhanja: vrijeme_kuhanja || recept.vrijeme_kuhanja,
      porcije: porcije || recept.porcije,
      url_slike: url_slike || recept.url_slike,
      kategorija_id: kategorija_id || recept.kategorija_id,
    });

    if (Array.isArray(sastojci)) {
      await recept.setSastojci([]);

      const sastojciZaPovezati = sastojci.map(s => ({
        sastojak_id: s.id,
        kolicina: s.kolicina
      }));

      await recept.addSastojci(
        sastojci.map(s => s.id),
        { through: sastojciZaPovezati }
      );
    }

    const updatedRecept = await Recept.findByPk(recept.id, {
      include: [
        { model: Kategorija, as: 'Kategorija' },
        { model: Sastojak, as: 'sastojci',
        through: {
          attributes: ['kolicina']
        }
      }
      ]
    });

    res.status(200).json(updatedRecept);
  } catch (error) {
    console.error("Greška pri ažuriranju recepta:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Izbriši recept
export const deleteRecept = async (req, res) => {
  try {
    const recept = await Recept.findByPk(req.params.id);
    if (!recept) {
      return res.status(404).json({ message: "Recept nije pronađen." });
    }

    await recept.setSastojci([]);
    await recept.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Greška pri brisanju recepta:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Pretraga po nazivu
export const searchRecepti = async (req, res) => {
  try {
    const { naziv_recepta } = req.query; // Pretraga po nazivu recepta, uzimanje upita iz query stringa

    if (!naziv_recepta) {
      return res.status(400).json({ message: "Upit je obavezan." });
    }

    const naziv = naziv_recepta.trim().toLowerCase();

    const recepti = await Recept.findAll({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('naziv_recepta')),
        {
          [Op.like]: `%${naziv}%` //da može unjeti samo dio naziva recepta
        }
      ),
      include: [
        { model: Kategorija, as: 'Kategorija' },
        { model: Sastojak, as: 'sastojci' }
      ]
    });

    if (!recepti || recepti.length === 0) {
      return res.status(404).json({ message: "Nema rezultata za dati upit." });
    }

    res.status(200).json(recepti);
  } catch (error) {
    console.error("Greška pri pretrazi recepata:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Dohvati recepte po kategoriji
export const getReceptiByKategorija = async (req, res) => {
  try {
    const { kategorija_id } = req.query;

    if (!kategorija_id) {
      return res.status(400).json({ message: "ID kategorije je obavezan." });
    }

    const recepti = await Recept.findAll({
      where: { kategorija_id },
      include: [
        { model: Kategorija, as: 'Kategorija' },
        { model: Sastojak, as: 'sastojci' }
      ]
    });

    if (!recepti || recepti.length === 0) {
      return res.status(404).json({ message: "Nema recepata za ovu kategoriju." });
    }

    res.status(200).json(recepti);
  } catch (error) {
    console.error("Greška pri dohvatanju recepata po kategoriji:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Dohvati recepte po sastojku
export const getReceptiBySastojak = async (req, res) => {
  try {
    const { sastojak_id } = req.query;

    if (!sastojak_id) {
      return res.status(400).json({ message: "ID sastojka je obavezan." });
    }

    const recepti = await Recept.findAll({
      include: [
        {
          model: Sastojak,
          as: 'sastojci',
          where: { sastojak_id: sastojak_id }
        },
        { model: Kategorija, as: 'Kategorija' }
      ]
    });

    if (!recepti || recepti.length === 0) {
      return res.status(404).json({ message: "Nema recepata sa ovim sastojkom." });
    }

    res.status(200).json(recepti);
  } catch (error) {
    console.error("Greška pri dohvatanju recepata po sastojku:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Dohati sve kategorije
export const getKategorije = async (req, res) => {
  try {
    const kategorije = await Kategorija.findAll();
    res.status(200).json(kategorije);
  } catch (error) {
    console.error("Greška pri dohvatanju kategorija:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getReceptiPaginacija = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;      
    let limit = parseInt(req.query.limit) || 10; 

    let offset = (page - 1) * limit;

    const { count, rows } = await Recept.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [
        { model: Kategorija, as: 'Kategorija' },
        { model: Sastojak, as: 'sastojci' }
      ],
      order: [['id_recepta', 'ASC']]
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      recepti: rows
    });
  } catch (error) {
    console.error('Greška pri dohvaćanju recepata:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

