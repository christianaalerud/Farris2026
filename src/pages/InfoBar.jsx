.info-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 20px 0;
  background-color: white;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap; /* gjør at de brytes pent på små skjermer */
}

/* Hver seksjon (svøm / sykkel / løp) */
.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Ikonstørrelse */
.icon {
  width: 60px;
  height: 60px;
  margin-bottom: 8px;
}

/* Tekst under ikonene */
.label {
  font-weight: 600;
  color: #111;
  font-size: 16px;
}

.value {
  color: #555;
  font-size: 14px;
}

/* ---------- RESPONSIV ---------- */
@media (max-width: 768px) {
  .info-bar {
    gap: 30px;
    padding: 15px 0;
  }

  .icon {
    width: 50px;
    height: 50px;
  }

  .label {
    font-size: 15px;
  }

  .value {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .info-bar {
    flex-direction: column;
    gap: 20px;
  }

  .icon {
    width: 45px;
    height: 45px;
  }

  .label {
    font-size: 14px;
  }

  .value {
    font-size: 12px;
  }
}
